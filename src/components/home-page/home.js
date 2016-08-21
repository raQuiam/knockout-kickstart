import ko from 'knockout';
import homeTemplate from 'text!./home.html';

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
        // this.message = ko.observable('Welcome to knockout-kickstart!');
        var self = this;
        this.tasks = ko.observableArray([]);
        this.newTaskText = ko.observable();
        this.incompleteTasks = ko.computed(function() {
            return ko.utils.arrayFilter(self.tasks(), function(task) { 
                return !task.isDone() 
            });
        });
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

    removeTask(task) {
        this.tasks.remove(task);
    }
    
    // doSomething() {
    //     this.message('You invoked doSomething() on the viewmodel.');
    // }
}


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
    }
}

export default { viewModel: HomeViewModel, template: homeTemplate };