import ko from 'knockout';

/**
 * Represent a task 
 * 
 * @class Task
 * @private
 */
class Task {
    constructor(params) {
        this.title = ko.observable(params.title);
        this.isDone = ko.observable(params.isDone);

        this.cssClasses = ko.pureComputed(function() {
            var allStyles = "list-group-item";
            if(this.isDone()) {
                allStyles += " list-group-item-success";
            }
            allStyles += " clearfix";
            return allStyles;
        }, this);
    }

    toggleState() {
        var isDone = this.isDone();
        this.isDone(!isDone);
    }
}

export default Task;