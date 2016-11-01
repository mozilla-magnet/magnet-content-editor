export const  beaconResponseStringA = `
[
  {
    "id":"3X",
    "channel":"UncoveringLondonTest",
    "url":"http://www.uncoveringlondon.co.uk/sailors-home-coming-window.htm",
    "call_to_action":"{}",
    "extra_metadata":"{}",
    "location":{"latitude":51.519053,"longitude":-0.099669},
    "is_virtual":true
  },
  {
    "id":"3Y",
    "channel":"UncoveringLondonTest",
    "url":"http://www.uncoveringlondon.co.uk/panyer-boy.htm",
    "call_to_action":"{}",
    "extra_metadata":"{}",
    "location":{"latitude":51.514984,"longitude":-0.09763},
    "is_virtual":true
  }
]
  `;

export const beaconResponseAExpectedState = {
  '3X': {
    location: { latitude: 51.519053, longitude: -0.099669 },
    url: 'http://www.uncoveringlondon.co.uk/sailors-home-coming-window.htm',
    isInvalidated: false,
  },
  '3Y': {
    location: { latitude: 51.514984, longitude: -0.09763 },
    url: 'http://www.uncoveringlondon.co.uk/panyer-boy.htm',
    isInvalidated: false,
  }
}
