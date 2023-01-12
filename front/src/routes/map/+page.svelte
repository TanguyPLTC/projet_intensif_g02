<script lang="ts">
  import * as L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { storable } from '../../lib/storable';
  import { goto } from '$app/navigation';

  let map: L.Map;

  type building = {
    idBuilding: number;
    adress: string;
    postalCode: string;
    city: string;
    latitude: string;
    longitude: string;
    maxPlace: number;
    usePlace: number;
  };

	let requestResult: [];
	let requestStatus: number;
	let requestPromise: Response;
	let loading: boolean = false;

	let error: Error | null;

  const availableBuildingsStore = storable('availableBuildings');

  const buildingList:building[] = $availableBuildingsStore.res;


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
        <b>Places disponibles: ${build.maxPlace - build.usePlace}</b>
        <Button class="btn btn-primary popupButton">Réserver</Button>`
      ).on("popupopen", (a) => {
        var popUp = a.target.getPopup()
        popUp.getElement()
        .querySelector(".popupButton")
        .addEventListener("click", e => {doPost(build.idBuilding);});
      }
      );
    }  
  }

  async function doPost(idBuilding: number) {
		try {
			error = null;
			loading = true;
			requestPromise = await fetch('https://intensif02.ensicaen.fr/api/reservation', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					dateStart: $availableBuildingsStore.request.dateStart,
					dateEnd: $availableBuildingsStore.request.dateEnd,
					needPlace: $availableBuildingsStore.request.needPlace,
					idEnterprise: 1,
          idBuilding: idBuilding
				})
			});

			requestStatus = requestPromise.status;
			if (requestStatus !== 201) {
				throw new Error(requestPromise.statusText);
			}

			requestResult = await requestPromise.json();

			goto('/list?success=true');
		} catch (ex) {
			error = ex as Error;
		} finally {
			loading = false;
		}
	}

</script>
<div style="height:90vh;width:90%;margin:0 auto;">
  <h1 class="container">Bâtiments disponibles :</h1>
  <div style="height:90vh;width:90%;margin:0 auto;" use:mapAction />
</div>
<svelte:window on:resize={resizeMap} />