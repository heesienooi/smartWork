define([
    'backbone',
    'hbs!templates/taskmap',
    'leaflet'
], function (Backbone, tmpl, L) {
    'use strict';

    var TaskMapView = Backbone.View.extend({

        template: tmpl,

        initialize: function () {
         this.render();
//           this.configureMap();
        },

        render: function () {
            var html = this.template();
            this.$el.html(html);
//            console.log(this.collection.toJSON());
//            var coordinates = this.collection.toJSON()[0].location.geometry.coordinates[0];
//            var latLong=coordinates.split(" ");
//            var map = L.map('map').setView([latLong[1], latLong[0]], 13);

            return this;
        },

        configureMap: function () {
            //coordinates
            var lat1 = -37.808975;
            var long1 = 144.965272;

            var lat2 = -37.808149;
            var long2 = 144.962692;
            // hard code coordinates
//            var map = L.map('map').setView([-37.808975, 144.965272], 13);

            var map = L.map('map').setView([((lat1)+(lat2))/2, (long1+long2)/2], 17)
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

//            var marker = L.marker([latLong[1], latLong[0]]).addTo(map);

            //instruction
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
                "http://router.project-osrm.org/viaroute?loc="+ lat1+","+ long1+ "&loc="+lat2+","+long2+"&instructions=true",
                function(data){
                    console.log(data);
                    console.log("----------------- " + data.route_name[0]+ " to " + data.route_name[1] + " -----------------");
                    for (i=0; i<data.route_instructions.length;i++)
                    {
                        switch(data.route_instructions[i][0])
                        {
                            case '0':
                                console.log("No Turn onto " + data.route_instructions[i][1], data.route_instructions[i][5]);
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
                        //array.push( {lat: lat * precision, lng: lng * precision} );
                        array.push( [lat * precision, lng * precision] );
                    }

                    var marker = L.marker([lat1, long1]).addTo(map);
                    marker.bindPopup("<b>Start</b><br>Initial Location.").openPopup();

                    var destination = L.marker([lat2, long2]).addTo(map);
                    destination.bindPopup("<b>End</b><br>Destination.");
                    var line_points = array;
                    line_points.unshift([lat1,long1]);
                    line_points.push([lat2,long2]);

                    var featureGroup = L.featureGroup().addTo(map);
                    var polyline = L.polyline(line_points, polyline_options).addTo(featureGroup);

                    var polyline_options = {
                        color: '#000'
                    };
                });

        }
    });

    return TaskMapView;
});
