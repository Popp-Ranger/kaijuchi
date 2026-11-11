/* ---------- icônes ---------- */
const sw=`stroke="${L}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const UI={
 meat:`<path ${sw} d="M20 29l-9 9c-2-2-6-1-6 2 0 2 2 3 3 3 0 2 1 4 3 4 3 0 4-4 2-6l9-9z" fill="#fff8e1"/><path ${sw} d="M29 4c9 0 15 7 14 16s-9 15-18 14c-3 0-6-2-8-4-4-5-4-13 0-19 3-4 7-7 12-7z" fill="#d9773c"/><path d="M30 10c4 0 7 3 8 7" stroke="#ffd0a8" stroke-width="3" fill="none" stroke-linecap="round"/>`,
 heart:`<path ${sw} d="M24 42C10 32 4 24 4 16 4 9 9 5 15 5c4 0 7 2 9 5 2-3 5-5 9-5 6 0 11 4 11 11 0 8-6 16-20 26z" fill="#ff4f8b"/><path d="M11 15c0-3 2-5 5-5" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`,
 bolt:`<path ${sw} d="M28 3L8 27h12l-3 18 22-27H26z" fill="#ffd23f"/>`,
 drop:`<path ${sw} d="M24 4C16 16 9 23 9 30a15 15 0 0030 0c0-7-7-14-15-26z" fill="#4db8ff"/><path d="M16 30c0 5 3 8 7 9" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`,
 ball:`<circle cx="24" cy="24" r="19" fill="#fff"/><path d="M24 5a19 19 0 0116.5 9.5L24 24z" fill="#ff5a5a"/><path d="M43 24a19 19 0 01-9.5 16.5L24 24z" fill="#ffd23f"/><path d="M24 43a19 19 0 01-16.5-9.5L24 24z" fill="#4db8ff"/><path d="M5 24a19 19 0 019.5-16.5L24 24z" fill="#5ed36a"/><circle cx="24" cy="24" r="19" fill="none" ${sw}/><circle cx="24" cy="24" r="4" fill="#fff" stroke="${L}" stroke-width="2"/>`,
 moon:`<path ${sw} d="M29 5a19 19 0 1014 30A16 16 0 0129 5z" fill="#ffe27a"/><path d="M33 12h8l-8 8h8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
 soap:`<rect ${sw} x="6" y="22" width="30" height="20" rx="8" fill="#ff9ecb"/><path d="M12 28h12" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/><circle ${sw} cx="33" cy="15" r="9" fill="#c9f0ff"/><circle ${sw} cx="17" cy="12" r="6" fill="#c9f0ff"/><circle ${sw} cx="41" cy="30" r="5" fill="#c9f0ff"/><path d="M29 12a4 4 0 014-3" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
 boom:`<polygon ${sw} points="${star(24,24,22,12,9)}" fill="#ffd23f"/><polygon points="${star(24,24,13,7,9)}" fill="#ff7a2e"/>`,
 flame:`<path ${sw} d="M24 3c2 10 13 14 13 26a13 13 0 01-26 0c0-6 3-9 6-12 0 6 2 8 4 8 2-8-2-14 3-22z" fill="#ff7a2e"/><path d="M24 40a7 7 0 01-7-7c0-4 3-6 5-9 1 4 3 4 4 1 3 3 5 5 5 8a7 7 0 01-7 7z" fill="#ffe14d"/>`,
 lock:`<path d="M9 14V10a6 6 0 0112 0v4" fill="none" stroke="${L}" stroke-width="3.5"/><rect x="5" y="13" width="20" height="15" rx="4" fill="#ffd23f" stroke="${L}" stroke-width="3"/><circle cx="15" cy="20" r="2.4" fill="${L}"/>`
};
const ui=n=>`<svg viewBox="0 0 48 48">${UI[n]}</svg>`;
const IC={
 flame:['0 0 48 48',UI.flame],heart:['0 0 48 48',UI.heart],
 butterfly:['-30 -28 60 56',butterfly(0,0,'#ff8fc0','#ffd23f')],apple:['-26 -42 52 48',apple(0,0)],fish:['-36 -22 66 44',fish(0,0)],ladybug:['-22 -28 46 36',ladybug(0,0)],
 cow:['-54 -70 100 76',cow(0,0)],tree:['-32 -64 64 68',tree(0,0,1)],car:['-42 -44 84 52',car(0,0,'#ff5a5a')],lamp:['-22 -56 52 60',lamp(0,0)],
 boat:['-46 -94 98 106',sail(0,0)],heli:['-104 -64 236 112',heli(0,0)],crowd:['-22 -26 44 30',person(-12,0,0)+person(12,0,2)+person(0,2,4)],bus:['-58 -52 116 60',bus(0,0,'#ffd23f')],
 building:['-12 -150 84 156',`<g transform="translate(0,46)">${building(0,60,120,PAL[2],mb(5))}</g>`],cargo:['-166 -140 336 156',cargo(0,0)],
 district:['-8 -128 176 134',`<g transform="translate(0,46)">${building(0,50,80,PAL[0],mb(2))+building(54,52,112,PAL[5],mb(4))+building(110,50,66,PAL[1],mb(9))}</g>`]
};
const ic=n=>`<svg viewBox="${IC[n][0]}">${IC[n][1]}</svg>`;

