import { writable } from 'svelte/store';

export const reservation = writable({
    city: "Caen",
    needPlace: 4,
    dateStart: new Date().toISOString().slice(0, 16),
    dateEnd: new Date().toISOString().slice(0, 16),
});
