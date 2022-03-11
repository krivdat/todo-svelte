# Todo

## New features

- [x] add option to filter todos based on responsible person (internal, external)
- [x] add possibility to edit existing todo
- [x] add option to filter only todos due today
- [ ] add option to filter todos due within next 7 days
- [x] sort todos by due date (closest date on top)
- [ ] authentication
  - [x] add users sign-up, sign-in and sign-out features
  - [ ] implement different access rights for every todo list (view only, view+edit, no access)
  - [x] add password hashing (currently plain-text passwords)
- [x] add custom confirmation dialog for deleting projects and todos
- [x] add task priorities: standard, high, top
- [x] add revised due date with possibility to change it in addition to original due date, which will remain always the same as set when adding the task
- [ ] add search box
- [ ] add PWA 
- [ ] add export/import to/from xls, csv

## Formatting, minor tweaks

- [ ] adjust formatting for small screens (mobile) - keep Added date in new todo insert form on the same line as Due date
- [ ] increase input fields height on iPhone mobile screen - tested on Iphone SE on Safari and Chrome, need to check other devices
- [x] add option to hide/show input form
- [ ] optically divide filters area (filter buttons and tasks summary)
- [x] add tooltips to icons in Todo.svelte: priority, edit, delete
- [ ] change the way of hiding task input form so that when it has some content in it will not be deleted during hiding/showing the form (use css instead of Svelte conditional rendering)
- [ ] add loading spinner for requests/actions that take longer to respond e.g. marking task as done, switching between different projects, etc. In general for all actions working with the database.
