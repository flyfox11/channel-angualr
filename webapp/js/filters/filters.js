angular.module('subApp')
    .filter("trustAsUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsUrl(recordingUrl);
        };
    }])
    .filter("trustAsResourceUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }])
    .filter("trustAsHtml", ['$sce', function ($sce) {
        return function (value) {
            if (!!value) {
                return $sce.trustAsHtml(value.toString());
            }

        };
    }]);


