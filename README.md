# SharepointService

An Simple AngularJS Service module to do basic operations with SharePoint 2013 REST APIs

The Service has following functions.

1. getListItems
2. addListItem
3. updateListItem
4. getGroupUsers 

#### 1. getListItems(listName, Columns, filters, orderby, top)

#### Arguments:

##### listName
type: `String`

The name of list to fetch data.

##### Columns
type: `Array`

An array containing the column names to return. 

#### filter
type: `Object`
A Javascript object containing the filter rules

*Example*

`{Title:{eq:'JavaScript'}}`

This will filter out the rows with Title value equal to JavaScript.

#### 2. addListItem(data, listName)

#### Arguments:

##### data
type: `Object`

An Object containing all the data to be saved to SharePoint List. The key must be column name of the list, make sure it is the internal name of the column.

##### listName

type: `String`

The name of the list to which the data is to be added.

#### 3. updateListItem(data, metadata)

#### 4. getGroupUsers(groupName)


### License

MIT License
