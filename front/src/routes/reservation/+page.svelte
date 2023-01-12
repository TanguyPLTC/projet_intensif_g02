<script lang="ts">
	import { reservation } from './store.js';
	import { goto } from '$app/navigation';
	import { storable } from '../../lib/storable.js';
	const availableBuildingsStore = storable('availableBuildings');

	let requestResult: [];
	let requestStatus: number;
	let requestPromise: Response;
	let loading: boolean = false;

	let error: Error | null;

	async function doPost() {
		try {
			error = null;
			loading = true;
			requestPromise = await fetch('https://intensif02.ensicaen.fr/api/building/available', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					city: $reservation.city,
					needPlace: $reservation.needPlace,
					dateStart: $reservation.dateStart,
					dateEnd: $reservation.dateEnd
				})
			});

			requestStatus = requestPromise.status;
			if (requestStatus !== 200) {
				throw new Error(requestPromise.statusText);
			}

			requestResult = await requestPromise.json();

			if (requestResult.length === 0) {
				throw new Error('Aucun résultat pour la demande');
			}

			availableBuildingsStore.set(requestResult);
			goto('/map');
		} catch (ex) {
			error = ex as Error;
		} finally {
			loading = false;
		}
	}
</script>

<div class="container">
	<h3>Bâtiments disponibles :</h3>

	{#if loading}
		<p>Veuillez patienter...</p>
	{:else if error && error.message}
		<h3 style="color: red">{error.message}</h3>
	{/if}

	{#if requestStatus === 200 && requestResult && requestResult.length > 0}
		<p>OK</p>
	{:else if loading === false}
		<form>
			<div class="mb-3">
				<label for="city" class="form-label">Ville</label>
				<input type="text" class="form-control" id="city" bind:value={$reservation.city} />
			</div>
			<div class="mb-3">
				<label for="numberPers" class="form-label">Nombre de personnes</label>
				<input
					type="number"
					class="form-control"
					id="numberPers"
					bind:value={$reservation.needPlace}
				/>
			</div>
			<div class="mb-3">
				<label for="dateStart" class="form-label">Date d'arrivée</label>
				<input
					type="datetime-local"
					class="form-control"
					id="dateStart"
					bind:value={$reservation.dateStart}
				/>
			</div>
			<div class="mb-3">
				<label for="dateEnd" class="form-label">Date de départ</label>
				<input
					type="datetime-local"
					class="form-control"
					id="dateEnd"
					bind:value={$reservation.dateEnd}
				/>
			</div>

			<button type="submit" class="btn btn-primary" on:click={doPost}>Afficher les bâtiments</button
			>
		</form>
	{/if}
</div>
