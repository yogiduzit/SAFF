const APIKEY = "adf68c474262738c411594f324f0d792b92077232dfa1ebda30cb108"
const RACKS_URL = "https://opendata.vancouver.ca/api/records/1.0/search?dataset=bike-racks"

export const getBikeRacks = async () => fetch(`${RACKS_URL}&rows=10&apikey=${APIKEY}`).then(res => res.json());


