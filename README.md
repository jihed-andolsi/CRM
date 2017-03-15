# CRM
Customer relationship management

![Preview](https://github.com/tunisianjocker/CRM/blob/master/CRM_conception.jpg)
# REST api using NodeJs
Using nodeJs can solve problem like mentioned by using classes or using frameworks. for me it is easy to see that i'm using the framework expressJs.
# Why expressJs?
ExpressJs is a famous framework. building web, network application and REST api becomes a lot easier, it supports the Model-View-Controller architecture and helps to start quickly to your project.
# Using mongoDb
I used mongoDb (document database) because it's a simple and a fast way to deal with your project data. It allows to write clear code using schemas.
# Explication
As you can see we have three classes with simple code and relations to manipulate data in database. those file are included in one file api.js to execute actions. i can mention some examples:
* Employee.create('Andolsi', 'Jihed', '58c85c88ea49c121b4acab59', callback);
* Project.create('Project 1', new Date(), '2', callback);
* Task.create('Task 1', 'Task 1 must be completed!', 2, callback);
* Task.adjustEstimatedDays('58c87fae90544b2b28397eec', 3, callback);
* Task.assginToProject('58c87f9b93ad0e267ceee77c', '58c876e3d8a3f82bd4a92464', callback);
* Project.assignToEmployee('58c87fae90544b2b28397eec', '58c85e33439fb7068c8f7e2d', callback);
* Task.delete('58c88072f3b2010bd8777a23', callback);
* Project.delete('58c876ded8a3f82bd4a92463', callback);
* Task.getTotalDaysNeeded(["58c876e3d8a3f82bd4a92464", "58c87f9b93ad0e267ceee77c"] , callback);
* Task.getAll(callback);
* Project.getAll(callback);
* Employee.getAll(callback);
