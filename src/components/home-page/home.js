import ko from 'knockout';
import homeTemplate from 'text!./home.html';
import Task from './Task';

/**
 * View Model for home screen, handle TODO application.
 * 
 * @class HomeViewModel
 */
class HomeViewModel {
    
    /**
     * Creates an instance of HomeViewModel.
     * 
     * @param {any} route
     */
    constructor(route) {
        var self = this;

        this.tasks = ko.observableArray([]);
        this.newTaskText = ko.observable();
        this.incompleteTasks = ko.computed(function() {
            return ko.utils.arrayFilter(self.tasks(), function(task) { 
                return !task.isDone() 
            });
        });
        this.isChillTime = ko.pureComputed(function() {
            var noOfRemaining = this.incompleteTasks();
            return noOfRemaining < 1;
        }, this);
    }

    /**
     * Add new Task, title comes from this.newTaskText
     * @public
     */
    addTask() {
        var task = new Task({
            title: this.newTaskText(),
            isDone: false
        });
        this.tasks.push(task);
        this.newTaskText("");
    }
    
    /**
     * Remove existing task
     * @public
     * @param {any} task
     */
    removeTask(task) {
        this.tasks.remove(task);
    }

    /**
     * Toggle task.isDone 
     * @public
     * @param {any} task
     */
    toggleTaskState(task) {
        task.toggleState();
    }
}

export default { viewModel: HomeViewModel, template: homeTemplate };