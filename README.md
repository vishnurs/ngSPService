# SharepointService

An Simple AngularJS Service module to do basic operations with SharePoint 2013 REST APIs

The Service has following functions.

1. getListItems
2. addListItem
3. updateListItem
4. getGroupUsers 

#### getListItems(listName, Columns, filters, orderby, top)

The function has five arguments
  - listName
  - Columns
  - filters
  - orderby
  - top

##### listName
type: `String`

The name of list to fetch data.

##### Columns
type: `Array`
An array containing the column names to return. 

#### filter
type: `Object`
A Javascript object containing the filter rules

