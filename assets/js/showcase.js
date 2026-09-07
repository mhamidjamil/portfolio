const cards = [...document.querySelectorAll('[data-search]')];
const filters = [...document.querySelectorAll('[data-filter]')];
const search = document.querySelector('#search');
let category = 'All';
function update() {
  const query = search.value.trim().toLowerCase();
  let count = 0;
  for (const card of cards) {
    card.hidden = !(category === 'All' || card.dataset.category === category) || !card.dataset.search.includes(query);
    if (!card.hidden) count++;
  }
  document.querySelector('#results').textContent = `${count} project${count === 1 ? '' : 's'}`;
  document.querySelector('#empty').hidden = count !== 0;
}
for (const button of filters) button.addEventListener('click', () => {
  category = button.dataset.filter;
  for (const filter of filters) filter.setAttribute('aria-pressed', String(filter === button));
  update();
});
search.addEventListener('input', update);
