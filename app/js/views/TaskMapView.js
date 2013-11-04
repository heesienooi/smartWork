define([
    'backbone',
    'hbs!templates/taskmap',
    'leaflet'
], function (Backbone, tmpl, L) {
    'use strict';

    var destination;    // destination marker point
    var userLat;        // user coordinates
    var userLong;

    var selectedLat;
    var selectedLong;
    var currentSelectedPoint;

    var map; //the map

    var TaskMapView = Backbone.View.extend({

        template: tmpl,

        events :{
            'click #getDirectionsButton' : 'getDirections',
            'click #completeTaskButton' : 'completeTask'
        },

        initialize: function () {
         this.render();
//           this.configureMap();
        },

        render: function () {
            var html = this.template();
            this.$el.html(html);

            return this;
        },

        // the meat of routing process
        getDirections: function (){

            destination = L.marker([userLat, userLong]).addTo(map);
            destination.bindPopup("<b>Start</b><br>You are here.");

            //instructions
            var NoTurn = 0;          //Give no instruction at all
            var GoStraight = 1;      //Tell user to go straight!
            var TurnSlightRight = 2;
            var TurnRight = 3;
            var TurnSharpRight = 4;
            var UTurn = 5;
            var TurnSharpLeft = 6;
            var TurnLeft = 7;
            var TurnSlightLeft = 8;
            var ReachViaPoint = 9;
            var HeadOn = 10;
            var EnterRoundAbout = 11;
            var LeaveRoundAbout = 12;
            var StayOnRoundAbout = 13;
            var StartAtEndOfStreet = 14;
            var ReachedYourDestination = 15;
            var EnterAgainstAllowedDirection = 16;
            var LeaveAgainstAllowedDirection = 17;

            $.getJSON(
                "http://router.project-osrm.org/viaroute?loc="+ userLat+","+ userLong+ "&loc="+selectedLat+","+selectedLong+"&instructions=true",
                function(data){
                    console.log(data);
                    console.log("----------------- " + data.route_name[0]+ " to " + data.route_name[1] + " -----------------");
                    for (var i=0; i<data.route_instructions.length;i++)
                    {
                        switch(data.route_instructions[i][0])
                        {
                            case '0':
                                console.log("No Turn" + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '1':
                                console.log("Go straight onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '2':
                                console.log("Turn right onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '3':
                                console.log("Turn right onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '4':
                                console.log("Turn right onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '5':
                                console.log("U-turn onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '6':
                                console.log("Turn left onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '7':
                                console.log("Turn left onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '8':
                                console.log("Turn left onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '9':
                                console.log("Reach via point onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '10':
                                console.log("Continue onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '11':
                                console.log("Enter roundabout onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '12':
                                console.log("Leave roundabout onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '13':
                                console.log("DStay on roundabout onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '14':
                                console.log("Start at end of street on " + data.route_instructions[i][1], data.route_instructions[i][5]);
                                break;
                            case '15':
                                console.log("You have reached your destination");
                                break;
                            default:
                                console.log("Unknown instruction received!");
                                break;
                        }
                    }

                    var zoomLevel = 17
                    if(data.route_summary.total_distance< 4000)
                        zoomLevel = 15;
                    else if(data.route_summary.total_distance<6000)
                        zoomLevel = 13;
                    else if(data.route_summary.total_distance<10000)
                        zoomLevel = 11
                    else if(data.route_summary.total_distance>10000)
                        zoomLevel=8;

                    console.log(data.route_summary.total_distance);
                    map.setView([(userLat+ selectedLat)/2, (userLong+selectedLong)/2], zoomLevel); map.setView([(userLat+ selectedLat)/2, (userLong+selectedLong)/2], zoomLevel);

                    var encoded = data.route_geometry;
                    var precision = 6;

                    precision = Math.pow(10, -precision);
                    var len = encoded.length, index=0, lat=0, lng = 0, array = [];
                    while (index < len) {
                        var b, shift = 0, result = 0;
                        do {
                            b = encoded.charCodeAt(index++) - 63;
                            result |= (b & 0x1f) << shift;
                            shift += 5;
                        } while (b >= 0x20);
                        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
                        lat += dlat;
                        shift = 0;
                        result = 0;
                        do {
                            b = encoded.charCodeAt(index++) - 63;
                            result |= (b & 0x1f) << shift;
                            shift += 5;
                        } while (b >= 0x20);
                        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
                        lng += dlng;
                        array.push( [lat * precision, lng * precision] );
                    }


                    var line_points = array;
                    line_points.unshift([userLat,userLong]);
                    line_points.push([selectedLat,selectedLong]);

                    var featureGroup = L.featureGroup().addTo(map);
                    var polyline = L.polyline(line_points, polyline_options).addTo(featureGroup);

                    var polyline_options = {
                        color: '#000'
                    };
                });

        },

        completeTask: function(){
            for(var i=0; i< this.collection.toJSON().length;i++)
            {
                if((this.collection.toJSON()[i].task.id == currentSelectedPoint.taskData.task.id)
                   && (this.collection.toJSON()[i].assignment.assignment_id ==
                    currentSelectedPoint.taskData.assignment.assignment_id))
                {
                    window.location.href = '#enketo/'+i;
                }
            }
        },

        configureMap: function () {

            navigator.geolocation.getCurrentPosition (function (pos)
            {
                userLat = pos.coords.latitude;
                userLong = pos.coords.longitude;
                console.log('User Latitude: ' + userLat);
                console.log('User Longitude: ' + userLong);
            });

            if(map!= null)
                map.remove();

            var firstTaskCoord = this.collection.toJSON()[0].location.geometry.coordinates[0];

            var theLong = parseFloat(firstTaskCoord.split(" ")[0]);
            var theLat = parseFloat(firstTaskCoord.split(" ")[1]);
            console.log(this.collection.toJSON()[0]);


            map = L.map('map').setView([theLat, theLong], 7);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            for(var i=0; i< this.collection.toJSON().length; i++)
            {

                //set the view on the map with the coordinates
                var taskCoord = this.collection.toJSON()[i].location.geometry.coordinates[0];

                 theLong = parseFloat(taskCoord.split(" ")[0]);
                 theLat = parseFloat(taskCoord.split(" ")[1]);

//            var map = L.map('map').setView([((userLat)+(destLat))/2, (userLong+destLong)/2], 17)

                destination =  L.marker([theLat, theLong]).addTo(map);
                destination.bindPopup(this.collection.toJSON()[i].task.title);
                destination.taskData = this.collection.toJSON()[i];

                // listen to click on points
                destination.on('click', function (d) {
                    // currently selected point's coordinates:
                    selectedLat = d.latlng.lat;
                    selectedLong = d.latlng.lng;
                    currentSelectedPoint = d.target;
                    console.log(currentSelectedPoint);
                });
            }
        }
    });

    return TaskMapView;
});
