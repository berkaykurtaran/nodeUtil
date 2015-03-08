/**
 * Created by berkay on 07.03.2015.
 */
//WeekEntries service used for communicating with the articles REST endpoints
angular.module('entries').service('Dates', function() {
    this.getWeeks = function() {
        var weeks=[];
        var weeksInYear=moment().weeksInYear();
        var startOfYear=moment().startOf('year');
        for (i = 0; i < weeksInYear; i++) {
            var currentDate=startOfYear.add(i,'w');
            var startOfWeek=currentDate.startOf('week');
            var endOfWeek=currentDate.endOf('week');
            var startString="("+startOfWeek.year()+","+startOfWeek.month()+","+startOfWeek.date()+")";
            var endString="("+endOfWeek.year()+","+endOfWeek.month()+","+endOfWeek.date()+")";
            var label="Hafta "+i+1 +" "+ startString+"-"+endString;
            var value=i+1;
            weeks.push({"label":label,"value":value});
        }
        return JSON.stringify(weeks);
    };

    this.getStartDateOfWeek = function(weekNumber) {
        var startOfYear=moment().startOf('year');
        var startOfWeek=startOfYear.add(weekNumber,'w').startOf('week');
        return startOfWeek;
    };

    this.getEndDateOfWeek = function(weekNumber) {
        var startOfYear=moment().startOf('year');
        var startOfWeek=startOfYear.add(weekNumber,'w').endOf('week');
        return startOfWeek;
    };
});
