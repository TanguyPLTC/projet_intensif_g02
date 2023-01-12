import { writable } from 'svelte/store';

export const reservation = writable({
    city: "Caen",
    needPlace: 4,
    dateStart: new Date(),
    dateEnd: new Date(),
});
