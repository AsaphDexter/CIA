function getCountryData() {
    var input = $('#countryInput').val();
  
    // Clear previous results
    $('#countryData').html('');
  
    if (!input) {
      $('#countryData').html('<p>Please enter a country name.</p>');
      return;
    }
  
    // Make an AJAX request to the API endpoint
    $.ajax({
      url: 'https://restcountries.com/v3.1/name/' + input,
      method: 'GET',
      dataType: 'json',
      success: function(response) {
        var country = response[0];
  
        if (!country) {
          $('#countryData').html('<p>No information found for the entered country.</p>');
          return;
        }
  
        // Extract the desired information
        var name = country.name.common;
        var capital = country.capital?.[0] || 'N/A';
        var population = country.population || 'N/A';
        var area = country.area || 'N/A';
        var currencies = Object.values(country.currencies || {}).join(', ') || 'N/A';
        var languages = Object.values(country.languages || {}).join(', ') || 'N/A';
  
        // Create an HTML element to display the information
        var countryInfo = `
          <div class="country-info">
            <h2>${name}</h2>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Area:</strong> ${area} km²</p>
            <p><strong>Currencies:</strong> ${currencies}</p>
            <p><strong>Languages:</strong> ${languages}</p>
          </div>
        `;
  
        // Append the country information to the div
        $('#countryData').append(countryInfo);
  
        // Store the searched country name in local storage
        var previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
        previousSearches.unshift(name);
        localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
      },
      error: function() {
        $('#countryData').html('<p>Failed to fetch country data.</p>');
      }
    });
  
    // Clear the input box
    $('#countryInput').val('');
  }
  
  // Fetch the list of countries for predictive text
  $.ajax({
    url: 'https://restcountries.com/v3.1/all',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      var countries = response.map(function(country) {
        return country.name.common;
      });
  
      // Populate the datalist with country names
      var datalist = $('#countryList');
      countries.forEach(function(country) {
        datalist.append(`<option value="${country}">`);
      });
    },
    error: function() {
      console.error('Failed to fetch country list for predictive text.');
    }
  });

  $(document).ready(function() {
    // Retrieve previous searches from local storage
    var previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
  
    // Update the previous searches list
    var previousSearchesList = $('#previousSearches ul');
    previousSearches.forEach(function(search) {
      previousSearchesList.append(`<li>${search}</li>`);
    });
  });
  
  