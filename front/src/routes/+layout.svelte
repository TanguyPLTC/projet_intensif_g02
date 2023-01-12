<script lang="ts">
	import { base } from '$app/paths';
</script>

<body data-sveltekit-preload-data="hover">
	<div class="container">
		<header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
			<a
				href={base + '/'}
				class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
			>
				<span class="material-symbols-outlined" style="font-size: 45px;">explore</span>
			</a>

			<ul class="nav nav-pills">
				<li class="nav-item"><a href={base + '/reservation'} class="nav-link">Réserver</a></li>
				<li class="nav-item">
					<a href={base + '/list'} class="nav-link">Voir les réservations</a>
				</li>
			</ul>
		</header>
	</div>

	<div><slot /></div>
</body>
