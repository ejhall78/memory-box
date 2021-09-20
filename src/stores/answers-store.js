import { writable } from 'svelte/store';
import { getUserInfo } from '../lib/firebase';

const answers = writable({});

export default answers;
