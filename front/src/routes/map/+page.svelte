<script lang="ts">
	import 'leaflet/dist/leaflet.css';

	import { storable } from '../../lib/storable';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let mounted = false;
	let leaflet: any;
	let map: any;

	onMount(async () => {
		if (browser) {
			leaflet = await import('leaflet');
			leaflet.Icon.Default.imagePath = (process.env.NODE_ENV === 'dev' ? '' : base) + '/';
		}

		mounted = true;
	});

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

	let requestStatus: number;
	let requestPromise: Response;

	const availableBuildingsStore = storable('availableBuildings');

	const buildingList: building[] = $availableBuildingsStore.res;

	function averageCoords() {
		let value: [number, number];
		var sum_latitude = 0;
		var sum_longitude = 0;
		for (let build of buildingList) {
			sum_latitude += +build.latitude;
			sum_longitude += +build.longitude;
		}
		value = [sum_latitude / buildingList.length, sum_longitude / buildingList.length];
		return value;
	}

	function createMap(container: string | HTMLElement) {
		let m = leaflet.map(container).setView(averageCoords(), 13);
		leaflet
			.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
				attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
          &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
				subdomains: 'abcd',
				maxZoom: 19
			})
			.addTo(m);

		return m;
	}

	function mapAction(container: string | HTMLElement) {
		map = createMap(container);
		loadMarker();
		return {
			destroy: () => {
				map.remove();
			}
		};
	}

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}

	function loadMarker() {
		for (let build of buildingList) {
			var marker = leaflet.marker([+build.latitude, +build.longitude]).addTo(map);
			marker
				.bindPopup(
				`<b>${build.adress}</b>
        <br>${build.city}, ${build.postalCode}</b>
        <br>Places disponibles: ${build.maxPlace - build.usePlace}</b>
        <br><div style="display: flex;justify-content: center;align-items: center;"><Button class="btn btn-sm mt-2 btn-primary popupButton" style="background-color: #8eafa1;border-color: #8eafa1;">Réserver</Button></div>`
				)
				.on('popupopen', (a: { target: { getPopup: () => any } }) => {
					var popUp = a.target.getPopup();
					popUp
						.getElement()
						.querySelector('.popupButton')
						.addEventListener('click', () => {
							doPost(build.idBuilding);
						});
				});
		}
	}

	async function doPost(idBuilding: number) {
		try {
			requestPromise = await fetch(import.meta.env.VITE_API_ENDPOINT + '/reservation', {
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

			goto(base + '/list?success=true');
		} catch (ex) {}
	}
</script>

{#if browser && mounted}
	<div style="height:90vh;width:90%;margin:0 auto;">
		<h1 class="container">Bâtiments disponibles :</h1>
		<div style="height:90vh;width:90%;margin:0 auto;" use:mapAction />
	</div>
{/if}

<svelte:window on:resize={resizeMap} />
