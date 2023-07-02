import express from 'express'
import {fetchMensa} from 'ka-mensa-fetch'

let localConfig = {};
try {
    // noinspection JSFileReferences - local configuration file is optional
    localConfig = (await import('./config.local.js')).default
} catch {}
const config = {...(await import('./config.js')).default, ...localConfig}

express()
    .get('/', async (req, res) => {
        // fetch plans
        const plans = await fetchMensa("simplesite", {
            dates: [
                // fetch current and next week
                new Date().getTime(),
                new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
            ]
        })

        // transform result
        const result = {}
        for (const plan of plans) {
            (result[plan.id] = result[plan.id] || {})[
                Math.floor(new Date(plan.date.year, plan.date.month, plan.date.day).getTime() / 1000)
            ] = Object.fromEntries(
                plan.lines.map(
                    line => [
                        line.id,
                        line.meals.map(
                            meal => ({
                                meal: meal.name,
                                dish: "",
                                add: meal.additives,
                                bio: meal.classifiers.includes("B"),
                                fish: meal.classifiers.includes("Fi"),
                                pork: meal.classifiers.includes("S"),
                                pork_aw: meal.classifiers.includes("SAT"),
                                cow: meal.classifiers.includes("R"),
                                cow_aw: meal.classifiers.includes("RAT"),
                                vegan: meal.classifiers.includes("VG"),
                                veg: meal.classifiers.includes("VEG"),
                                mensa_vit: meal.classifiers.includes("MV"),
                                info: "",
                                price_1: meal.price
                                    ? parseFloat(meal.price
                                        .replace(/^[^\d]+/, "") // remove leading non-digits
                                        .replace(",", "."))
                                    || 0.0 // convert NaNs to 0.0
                                    : 0.0,
                                price_2: 0.0,
                                price_3: 0.0,
                                price_4: 0.0,
                                price_flag: 0,
                            })
                        )
                    ]
                )
            )
        }

        res.json(result);
    })
    .listen(config.listen_port)
