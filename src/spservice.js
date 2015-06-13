angular.module('SharePointService', [])
.service('SPService', ['$http', function ($http) {
    this.addListItem = function (data, listName) {
        var params = data;
        params.__metadata = {};
        params.__metadata.type = 'SP.Data.'+listName+'ListItem';

        var req = {
            method: 'POST',
            url: SP_GLOBAL.WEB_URL + "/_api/web/lists/getbytitle('"+listName+"')/items",
            headers: {
                'Content-Type': 'application/json;odata=verbose',
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': SP_GLOBAL.REQUEST_DIGEST
            },
            data: JSON.stringify(params),
        };

        return $http(req);
    };

    this.updateListItem = function(data, metadata) {

        var params = data;
        params.__metadata = {};
        params.__metadata.type = metadata.type;

        return $http({
            method: 'POST',
            url: SP_GLOBAL.WEB_URL + '/_api/' + metadata.id,
            headers: {
                'Content-Type': 'application/json;odata=verbose',
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': SP_GLOBAL.REQUEST_DIGEST,
                'X-HTTP-Method': 'MERGE',
                'If-Match': metadata.etag
            },
            data: JSON.stringify(params),
        });
    }

    this.getUserById = function(uid) {
        return $http.get(SP_GLOBAL.WEB_URL + "/_api/web/getUserById("+uid+")");
    }

    this.me = function () {
        return $http.get(SP_GLOBAL.WEB_URL + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties");
    }

    this.getGroupUsers = function(groupName) {
        return $http.get(SP_GLOBAL.WEB_URL + "/_api/web/sitegroups/getbyname('"+groupName+"')/users");
    }

    this.getListItems = function(listName, Columns, filters, orderby, top) {
        var selectString = '';
        if(Columns && Columns instanceof Array) {
            for (i=0; i<Columns.length; i++) {
                selectString += Columns[i] + ',';
            }
            selectString = selectString.slice(0, -1);
            if(selectString) {
                selectString = '$select=' + selectString + '&';
            }
        }
        var filterString = '';
        if(filters && filters instanceof Object ) {

            for(var columnName in filters) {
                for(var symbol in filters[columnName]) {
                    filterString += columnName + ' ' + symbol + ' \'' + filters[columnName][symbol]+'\' and ';
                }
            }

            filterString = filterString.substring(0, filterString.length-4);
            if(filterString) {
                filterString = '$filter=' + filterString + '&';
            }

        }
        var topString = '';
        if(top) {
            topString = '$top=' + top;
        }
        return $http.get(SP_GLOBAL.WEB_URL + "/_api/web/lists/getByTitle('"+SP_GLOBAL.LISTS[listName]+"')/items?" + selectString + filterString + topString);
    }
}])
.constant( 'SP_GLOBAL', {
    WEB_URL : 'XXXXX',
    WEB_URL : 'XXXXX',
    REQUEST_DIGEST : document.getElementById( '__REQUESTDIGEST' ).value
});
