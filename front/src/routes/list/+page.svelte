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

	onMount(reloadData);

	async function reloadData() {
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
	}

	function formatDate(date: string) {
		return dayjs(date).format('DD/MM/YYYY HH:mm');
	}

	function buildAddress(building: building) {
		return `${building.adress}, ${building.postalCode} ${building.city}`;
	}

	let currentReservationId = 0;

	function setCurrentId(id: number) {
		currentReservationId = id;
	}

	async function deleteById() {
		const res = await fetch(
			`https://intensif02.ensicaen.fr/api/reservation/${currentReservationId}`,
			{
				method: 'DELETE'
			}
		);
		const data = await res.json();

		if (data.affected > 0) {
			reloadData();
		}
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
				<th />
			</thead>
			<tbody>
				{#each data as reservation}
					<tr>
						<td>{buildAddress(reservation.building)}</td>
						<td>{formatDate(reservation.dateStart)}</td>
						<td>{formatDate(reservation.dateEnd)}</td>
						<td>{reservation.place}</td>
						<td
							><button
								class="btn btn-danger"
								data-bs-toggle="modal"
								data-bs-target="#deleteModal"
								on:click={() => setCurrentId(reservation.idReservation)}>Annuler</button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<h1>Aucune réservation</h1>
	{/if}
</div>

<div
	class="modal fade"
	id="deleteModal"
	tabindex="-1"
	aria-labelledby="deleteModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="deleteModalLabel">Confirmation</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">Êtes-vous sûr de vouloir annuler cette réservation ?</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Retour</button>
				<button type="button" class="btn btn-primary" data-bs-dismiss="modal" on:click={deleteById}
					>Annuler la réservation</button
				>
			</div>
		</div>
	</div>
</div>
