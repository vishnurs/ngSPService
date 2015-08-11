(function() {

'use strict';

angular.module('SharePointService', [])
.service('SPService', ['$http', function ($http) {
    this.uploadAttachment = function(listName, itemID, fileName, fileData) {
        return $http({
            method: 'POST',
            url: SP_GLOBAL.WEB_URL + "/_api/web/lists/getbytitle('"+listName+"')/items("+itemID+")/AttachmentFiles/add(FileName='"+fileName+"')",
            headers: {
                'Content-Type': 'application/json;odata=verbose',
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': SP_GLOBAL.REQUEST_DIGEST
            },
            data: fileData
        });
    };

    this.deleteAttachment = function() {
        return $http({
            method: 'DELETE',
            url: SP_GLOBAL.WEB_URL + "/_api/web/lists/getbytitle('"+listName+"')/items("+itemID+")/AttachmentFiles/add(FileName='"+fileName+"')",
            headers: {
                'Content-Type': 'application/json;odata=verbose',
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': SP_GLOBAL.REQUEST_DIGEST
            }
        });
    };

    this.getAttachments = function() {
        return $http({
            method: 'GET',
            url: SP_GLOBAL.WEB_URL + "/_api/web/lists/getbytitle('"+listName+"')/items("+itemID+")/AttachmentFiles",
            headers: {
                'Content-Type': 'application/json;odata=verbose',
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': SP_GLOBAL.REQUEST_DIGEST
            }
        });
    };

    this.addListItem = function (data, listName) {
        data.__metadata = {};
        data.__metadata.type = 'SP.Data.'+listName+'ListItem';
        var req = {
            method: 'POST',
            url: SP_GLOBAL.WEB_URL + "/_api/web/lists/getbytitle('"+listName+"')/items",
            headers: {
                'Content-Type': 'application/json;odata=verbose',
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': SP_GLOBAL.REQUEST_DIGEST
            },
            data: JSON.stringify(data),
        };
        return $http(req);
    };

    this.updateListItem = function(data, metadata) {
        data.__metadata = {};
        data.__metadata.type = metadata.type;
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
            data: JSON.stringify(data),
        });
    };

    this.getUserById = function(uid) {
        return $http.get(SP_GLOBAL.WEB_URL + "/_api/web/getUserById("+uid+")");
    };

    this.me = function () {
        return $http.get(SP_GLOBAL.WEB_URL + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties");
    };

    this.getGroupUsers = function(groupName) {
        return $http.get(SP_GLOBAL.WEB_URL + "/_api/web/sitegroups/getbyname('"+groupName+"')/users");
    };

    this.getListItems = function(listName, Columns, filters, orderBy, top) {
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

        var orderByString = '';
        if(orderBy && orderBy instanceof Array) {
            orderByString = '$orderby=' + orderBy[0];
            orderByString += orderByString[1] ? ' '+orderByString[1] : ' asc';
            if(orderByString) {
                orderByString += '&';
            }
        }

        var topString = '';
        if(top) {
            topString = '$top=' + top;
        }
        return $http.get(SP_GLOBAL.WEB_URL + "/_api/web/lists/getByTitle('"+listName+"')/items?" + selectString + filterString + topString);
    };
}])
.constant( 'SP_GLOBAL', {
    WEB_URL : 'XXXXX',
    REQUEST_DIGEST : document.getElementById( '__REQUESTDIGEST' ).value
});
})();
