/**
 * Created by berkay on 07.03.2015.
 */
//WeekEntries service used for communicating with the articles REST endpoints
angular.module('entries').service('Dates', function() {
    this.getWeeks = function() {
        var dates=[];
        var weeksInYear=moment().weeksInYear();

        for (i = 0; i < weeksInYear; i++) {
            var startOfYear=moment().startOf('year');

            var startOfWeek=startOfYear.add(i,'w').startOf('week').format("YYYY/MM/DD");
            var endOfWeek=startOfYear.add(i,'w').endOf('week').format("YYYY/MM/DD");

            var label="Hafta "+(i+1) +" "+ startOfWeek+"-"+endOfWeek;
            var value=(i+1);
            dates.push({"label":label,"value":value});
        }
        return dates;
    };

    this.getStartDateOfWeek = function(weekNumber) {
        var startOfYear=moment().startOf('year');
        var startOfWeek=startOfYear.add(weekNumber,'w').startOf('week');
        return startOfWeek.toDate();
    };

    this.getEndDateOfWeek = function(weekNumber) {
        var startOfYear=moment().startOf('year');
        var endOfWeek=startOfYear.add(weekNumber,'w').endOf('week');
        return endOfWeek.toDate();
    };

});
