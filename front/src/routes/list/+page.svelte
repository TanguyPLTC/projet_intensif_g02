<script lang="ts">
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';

	type building = {
		idBuilding: number;
		adress: string;
		postalCode: string;
		city: string;
		latitude: string;
		longitude: string;
		maxPlace: number;
	};

	type reservation = {
		idReservation: number;
		dateStart: string;
		dateEnd: string;
		place: number;
		building: building;
	};

	const enterpriseId = 1;
	let data: reservation[] = [];
	let error: Error;
	let loading = true;

	onMount(async () => {
		try {
			loading = true;
			const res = await fetch(
				`https://intensif02.ensicaen.fr/api/reservation/enterprise/${enterpriseId}`,
				{
					method: 'GET'
				}
			);

			data = await res.json();
		} catch (ex) {
			error = ex as Error;
		} finally {
			loading = false;
		}
	});

	function formatDate(date: string) {
		return dayjs(date).format('DD/MM/YYYY HH:mm');
	}

	function buildAddress(building: building) {
		return `${building.adress}, ${building.postalCode} ${building.city}`;
	}
</script>

<div class="container">
	{#if loading}
		<h1>Veuillez patienter...</h1>
	{:else if error && error.message}
		<h3 style="color: red">{error.message}</h3>
	{:else if data.length > 0}
		<h1>Réservations :</h1>
		<table class="table">
			<thead>
				<th>Adresse</th>
				<th>Date de début</th>
				<th>Date de fin</th>
				<th>Nombre de place</th>
			</thead>
			<tbody>
				{#each data as reservation}
					<tr>
						<td>{buildAddress(reservation.building)}</td>
						<td>{formatDate(reservation.dateStart)}</td>
						<td>{formatDate(reservation.dateEnd)}</td>
						<td>{reservation.place}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<h1>Aucune réservation</h1>
	{/if}
</div>
