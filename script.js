/* 
build input to take single state at a time; in two letter format
number input to set max num of results(default @ 10)
    Display:
            -name
            -description
            -site url
            
couldn't obtain address :(  )
*/

const apiKey = 'mhvRRBz18lz0eK7uExxnelaWLWAhpJrxI93Ts3LL'

function reformatParam(params) {
    const result = []

        const tempKey = Object.keys(params)[0]
        const tempVal = Object.values(params)[0]
        const tempEnt = Object.entries(params) 

    for(const [tempKey, tempVal] of tempEnt) {
      const str = `${tempKey}=${tempVal}`

      result.push(str)
    }
   return result.join('&')
}

function buildUrl(query) {
    const baseUrl = 'https://api.nps.gov/api/v1/parks?' 
    const params = {
        states: query,
        api_key: apiKey
    }
    const finalParams = reformatParam(params)
    
   return `${baseUrl}${finalParams}`
}





function gatherResults(resj, query) {
  console.log(Object.entries(resj.data[0]))
  const data = resj.data 
  let arr = []
  for (let i = 0; i < data.length; i++) {
   if (data[i].states == query) {
     arr.push(data[i])

     }
   }
   if (arr.length >= 1) {
     
  return arr
   } else {$('.js-results').append(`<h3>Sorry, no park listings for that state!</h3>`)
   }
}

function displayResults(arr, num) {
console.log(arr.length)
let results = ""
let count = 0

  for (let i = 0; i < arr.length; i++) {
    results += `<li><h1>${arr[i].fullName}</h1>
                <p>${arr[i].description}</p>
                <a href="${arr[i].url}">See more on this park!</a></li>`
    count += 1;
   if (count == num) {
     break;
     }
  }
  $('.js-results').append(`<div class="results-legend">Showing ${count} out of ${arr.length} results</div><ul>${results}</ul><div class="results-legend">Showing ${count} out of ${arr.length} results</div>`)
}



function findPark(query, num) {
    const finalUrl = buildUrl(query);
    
    fetch(finalUrl)
    .then(res => {
        if (res.ok) {
            return res.json()
        } throw new Error(res.statusText)
    } )
    .then(resj => gatherResults(resj, query))
    .then(response => displayResults(response, num))
    .catch(err => console.log(err.message))

}


function formWatch() {

    $('.js-search-form').submit('', function(e) {
        e.preventDefault();
        $('.js-results').empty().removeClass('hidden')
        const location = $('.location-field-input').val()
        const numResult = $('.quantity-field-input').val()
        // console.log(location)
        findPark(location, numResult)
    })
}
formWatch()