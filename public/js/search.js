const brandList = document.getElementById('brandList');
const brandDatalist = document.getElementById('brandDatalist');
const modelsList = document.getElementById('modelsList');
const modelsDatalist = document.getElementById('modelsDatalist');
const info = document.getElementById('info');


brandList.addEventListener('submit', (event) => event.preventDefault());

let flag = true;

const renderHbs = async (data) => {
  const url = '/hbs/models.hbs';
  let template = await fetch(url);
  const modelName = modelsList.elements.search.value;
  console.log(modelName);
  template = await template.text();
  let itemRender = Handlebars.compile(template);
  return itemRender({
    items: data.items.specifications.filter((el) => el.name !== 'Подробные характеристики'),
    name: modelName,
    photos: data?.photos?.pictures,
    price: data?.price?.price,
    priceUpdated: data?.price.price_updated,
  });
};

brandList.elements.search.addEventListener('input', async (event) => {
  const categoryId = brandDatalist.querySelector(`[value="${(event.target.value)}"]`)?.id;
  if (flag && categoryId) {
    const body = {
      id: categoryId,
    };

    const response = await fetch('/models', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    response.json().then((data) => {
      modelsList.style.display = 'block';
      data.forEach((item) => {
        modelsDatalist.insertAdjacentHTML('afterbegin', `<option id="${item.id}" value="${item.name}">`);
      });
    });
  } else {
    modelsList.style.display = 'none';
    modelsDatalist.innerHTML = '';
    info.innerHTML = '';
    modelsList.elements.search.value = '';
  }
});

modelsList.elements.search.addEventListener('input', async (event) => {
  const modelId = modelsDatalist.querySelector(`[value="${(event.target.value)}"]`)?.id;
  if (flag && modelId) {
    const response = await fetch(`/models/${modelId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const modelRender = await response.json();
    console.log(modelRender);
    const result = await renderHbs(modelRender);
    info.insertAdjacentHTML('beforeend', result);
  } else {

    info.innerHTML = '';
  }
});
