const { author, meliBaseApiUrl, currencies } = require('../config/key');
const getDecimals = require('../utils/itemUtils');
const axios = require('axios');

const fetchItems = async (param = '') => {
	try {
		const {
			data: { results, filters },
		} = await axios.get(`${ meliBaseApiUrl }/sites/MLA/search?q=${ param }&limit=4`);

		const categories = [];
		const items = [];

		for (const filter of filters) {
			const { id, values } = filter;
			if (id === 'category') {
				for (const value of values) {
					if (value.path_from_root) {
						const categoriesFromPath = value.path_from_root;

						for (const category of categoriesFromPath) {
							categories.push(category.name);
						}
						break;
					}
				}
				break;
			}
		}

		for (const result of results) {
			const {
				currency_id,
				id: resultId,
				title,
				price,
				thumbnail,
				condition,
				shipping: { free_shipping },
			} = result;
			const { symbol } = currencies.find(({ id }) => id === currency_id);

			const item = {
				id: resultId,
				title,
				price: {
					currency: symbol,
					amount: price,
					decimals: getDecimals(price),
				},
				picture: thumbnail,
				condition,
				free_shipping,
			};

			items.push(item);
		}

		return {
			author,
			categories,
			items,
		};
	} catch (error) {
		return {
			author,
			categories: [],
			items: [],
			status: error.response.status || 500,
			message: `An error occurred: ${ error }`,
		};
	}
};

const fetchItemDescription = async (param) => {
	try {
		const {
			data: {
				id: itemId,
				title,
				category_id,
				price,
				currency_id,
				sold_quantity,
				thumbnail,
				condition,
				shipping: { free_shipping },
			},
		} = await axios.get(`${ meliBaseApiUrl }/items/${ param }`);

		const categories = [];

		const { symbol } = currencies.find(({ id }) => id === currency_id);

		const {
			data: { plain_text: description },
		} = await axios.get(`${ meliBaseApiUrl }/items/${ param }/description`);

		const {
			data: { path_from_root: categoryBreadcrumb },
		} = await axios.get(`${ meliBaseApiUrl }/categories/${ category_id }`);

		for (const category of categoryBreadcrumb) {
			categories.push(category.name);
		}

		return {
			author,
			item: {
				id: itemId,
				title,
				price: {
					currency: symbol,
					amount: price,
					decimals: getDecimals(price),
				},
				picture: thumbnail,
				condition,
				free_shipping,
				sold_quantity,
				description,
				categories,
			},
		};
	} catch (error) {
		return {
			author: config.author,
			item: '',
			status: error.response.status || 500,
			message: `Error: ${ error }`,
		};
	}
};

module.exports = {
	fetchItems,
	fetchItemDescription,
};
