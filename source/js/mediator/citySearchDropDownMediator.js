define(['lib/news_special/bootstrap', 'utils'], function (news, utils) {

    var $searchForm;
    var $cityDropDown;
    var $searchSubmit;

    var selectedCityFileName;
    var basePath;

    var init = function (baseDataPath) {
        $searchForm = news.$('#ns12791_countryFreeTextSearchHolder');
        $cityDropDown = news.$('#city-search--dropdown-input');
        $searchSubmit = news.$('.country-search--submit');

        basePath = baseDataPath;

        news.pubsub.on('user-autocomplete-country', loadCountriesCities);
        $cityDropDown.change(handleCitySelected);
        $searchForm.on('submit', onSubmit);
    };

    var loadCountriesCities = function (countryName) {
        // load the city options for the country selected
        var countrySafePathName = utils.normaliseFilename(countryName);
        var countriesCityListFilePath = basePath + 'cities_list_' + countrySafePathName + '.js';

        // clear the dropdown list
        $cityDropDown.empty();

        // load the jsonp and populate the dropdown
        var that = this;
        require([countriesCityListFilePath + '?callback=define'], function (citiesList) {
            news.$('<option />', {
                text: $cityDropDown.attr('data-select-city'),
                selected: 'selected',
                disabled: 'disabled',
                hidden: 'hidden'        // so it isn't displayed in the dropdown list
            }).appendTo($cityDropDown);

            var $citiesOptGroup = news.$('<optgroup />', {
                label: $cityDropDown.attr('data-select-city')
            }).appendTo($cityDropDown);

            news.$(citiesList.data).each(function () {
                news.$("<option />", {
                    val: this.cityFileName,
                    text: this.cityName
                }).appendTo($citiesOptGroup);
            });

            if (citiesList.data.length === 1) {
                $cityDropDown.find('option:eq(2)').attr('selected', true);
                $cityDropDown.trigger('change');
            }

        }, function (err) {
            //couldn't load the cities for the selected country/region :s
        });
    };

    var handleCitySelected = function (e) {
        var cityFileName = e.target.value;
        selectedCityFileName = cityFileName;
        if (!cityFileName) {
            utils.disableInput($searchSubmit);
        } else {
            utils.enableInput($searchSubmit);
        }
    };

    var onSubmit = function () {
        news.istats.log('newsspec-interaction', 'search-button-clicked');
        news.istats.log('newsspec-interaction', 'country-search-button-clicked');
        news.pubsub.emit('user-submitted-city', [basePath, selectedCityFileName]);
        return false;
    };

    var publicApi = {
        init: init
    };

    return publicApi;

});