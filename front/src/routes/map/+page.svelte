<script lang="ts">
  import * as L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  /** @type {import('./$types').PageData} */  
  export let data;

  let map: L.Map;

  type building = {
    idBuilding: number;
    adress: string;
    postalCode: string;
    city: string;
    latitude: string;
    longitude: string;
    maxPlace: number;
  };

  const buildingList:building[] = data.item;

  function averageCoords() {
    let value:[number, number]
    var sum_latitude = 0;
    var sum_longitude = 0;
    for(let build of buildingList) {
      sum_latitude += +build.latitude;
      sum_longitude += +build.longitude;
    };
    value = [sum_latitude/buildingList.length, sum_longitude/buildingList.length];
    return value;
  }

  function createMap(container: string | HTMLElement) {
    let m = L.map(container).setView(averageCoords(), 13);
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
          &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
        subdomains: 'abcd',
        maxZoom: 19,
      }
    ).addTo(m);

    return m;
  }

  function mapAction(container: string | HTMLElement) {
    map = createMap(container);
    loadMarker();
    return {
      destroy: () => {
        map.remove();
      },
    };
  }

  

  function resizeMap() {
    if(map) { map.invalidateSize(); }
  }

  function loadMarker() {
    for(let build of buildingList) {
      var marker = L.marker([+build.latitude, +build.longitude]).addTo(map);
      marker.bindPopup(
        `<b>${build.adress}</b>
        <br>${build.city}, ${build.postalCode}</br>
        <b>Places disponibles: ${build.maxPlace}</b>
        <Button class="btn btn-primary popupButton">Réserver</Button>`
      ).on("popupopen", (a) => {
        var popUp = a.target.getPopup()
        popUp.getElement()
        .querySelector(".popupButton")
        .addEventListener("click", e => {book(build.idBuilding);});
      }
      );
    }  
  }

  function book(id:number) {
    //TODO: post reservation
    console.log("Booking building " + id);
  }

</script>

<h1>Welcome to SvelteKit</h1>
<div style="height:90vh;width:90%;margin:0 auto;" use:mapAction />
<svelte:window on:resize={resizeMap} />