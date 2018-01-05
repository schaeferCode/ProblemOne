var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
        'room_no': 'A0073',
        'some_array': [7,2,4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
];

function addElements(arr) {
  return arr.reduce((acc, val) => acc + val);
}

function isGuest(obj) {
  return obj.guest_type === 'guest';
}

function flatten(obj) {
  let result = {};
  for (let key in obj) {
    // obj.toString.call(obj[key] will ensure a check for object only
    if (obj.toString.call(obj[key]) === '[object Object]') {
      let flatObj = flatten(obj[key]);
      for (let subKey in flatObj) {
        result[subKey] = flatObj[subKey];
      }
    // check if value is an array and if so call addElements
    } else if (Array.isArray(obj[key])) {
      result[key] = addElements(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

function compareLast(a, b) {
  let lastNameA = a.last_name;
  let lastNameB = b.last_name;
  if (lastNameA > lastNameB) {
    return 1;
  } else if (lastNameA === lastNameB) {
    return compareFirst(a, b);
  } else {
    return -1;
  }
}

function compareFirst(a, b) {
  let firstNameA = a.first_name;
  let firstNameB = b.first_name;
  if (firstNameA < firstNameB) {
    return -1;
  } else {
    return 1;
  }
}

function mutateArray(a) {
  let mappedArray = [];
  for (let i = 0; i < a.length; i++) {
    if (isGuest(a[i])) {
      mappedArray.push(flatten(a[i]));
    }
  }
  return mappedArray.sort(compareLast);
}

$(document).ready(function() {
    $('#originalArray').html(JSON.stringify(arr, null, 2));
    $('#resultsArray').html(JSON.stringify(mutateArray(arr), null, 2));
});
