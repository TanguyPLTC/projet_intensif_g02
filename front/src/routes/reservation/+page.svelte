<script lang="ts">
	import { reservation } from './store.js';

	let result = null;
	async function doPost() {
		const res = await fetch('https://intensif02.ensicaen.fr/api/building/available', {
			method: 'PUT',
			body: JSON.stringify(reservation)
		});
		const json = await res.json();
		result = JSON.stringify(json);
	}
</script>

<h3>Réservation:</h3>
<form>
	<div class="mb-3">
		<label for="city" class="form-label">Ville</label>
		<input type="text" class="form-control" id="city" bind:value={$reservation.city} />
	</div>
	<div class="mb-3">
		<label for="numberPers" class="form-label">Nombre de personnes</label>
		<input type="number" class="form-control" id="numberPers" bind:value={$reservation.city} />
	</div>
	<div class="mb-3">
		<label for="dateStart" class="form-label">Date d'arrivée</label>
		<input
			type="datetime"
			class="form-control"
			id="dateStart"
			bind:value={$reservation.dateStart}
		/>
	</div>
	<div class="mb-3">
		<label for="dateEnd" class="form-label">Date de départ</label>
		<input type="datetime" class="form-control" id="dateEnd" bind:value={$reservation.dateEnd} />
	</div>

	<button type="submit" class="btn btn-primary" on:click={doPost}>Submit</button>
</form>
