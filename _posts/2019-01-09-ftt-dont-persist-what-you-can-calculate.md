---
layout: post
tags: ["From The Toolbox"]
title: "From the Toolbox: Don't persist what you can calculate"
image: "assets/ftt-dont-persist-what-you-can-calculate.jpg"
image_alt: "An old calculator (resulta 7)"
---
Granted, most software would be useless without its own persistence, be it something based on EventSourcing or a common relational or document-oriented database. But there are occasions where importing and transforming data, just so it fits into my applications persistence layer just feels wrong. This is where I can trade in performance for flexibility and derive the information I need directly from the source, even if that means parsing hundreds of CSV files for each request.

# Context

Your application retrieves data from an external source, e.g. users uploading CSV files, a partner providing you with their latest dataset through an XML file or you provide a webhook through which you are informed about latest changes.

The data is necessary for your application to base decisions on, but your application does not own the data, nor can it manipulate the data apart from doing projections and calculations on it. The one thing we're trying to avoid is to transform this data into a database table or domain events that are read-only and whose origins are outside of your control.

You're looking for an architectural design that allows you to extract more information from the *Single Source Of Truth* that is the original files at a later point, but you need to provide data derived from it right now as well.

# Reasoning

If an external source is providing data to you, it may so happen that external source is the *Single Source Of Truth* of that information. This implies that you can't directly change what the data says, but need to invoke a (manual) process to correct that data. The more you tie this information into your application, the more important the transformation function becomes.

> SSoT -> Transformation -> Database -> Repository -> Domain

```js
const MerchantsService = {
  create: (merchant) => Merchants.create({id: merchant.id, name: merchant.name}),
  all: () => Merchants.findAll(),
  find: (id) => Merchants.findOne({where: { id }})
};

app.post('/hook', (req, res) => {
  // Let's imagine the body is a CSV
  const newMerchants = parseCsv(res.body);

  for(let merchant of newMerchants) {
    const transformedMerchant = {
      id: merchant["identifier"],
      name: merchant["chain name"]
    };

    MerchantsService.create(merchant);
  }

  res.status(200).send();
});

app.get('/merchants', (req, res) => {
  MerchantsService.findAll().then(merchants => res.send(merchants));
});
```

If the *Single Source Of Truth* provides you with less structured data than what you want to store in your database, transformation errors can become more common and fragility of that data leaks into your business domain. A good indicator for this situation is when you frequently have imports that fail because of structural deficiencies or unexpected values (e.g. of enumerations) in the data you want to import.

# Pattern

Skip transforming the data provided to you by the *Single Source Of Truth* and instead store the raw data in a way that preserves it's original format best, e.g. by storing the CSV files as it was uploaded.

> SSoT <strike>-> Transformation -> Database</strike> -> Repository -> Domain

Instead, rewrite the *Repository* that is providing access to the information to be an ad-hoc transformation of the data stored in its original format.

```js
const MerchantsService = {
  all: async () => {
    // Find all files
    const merchantFiles = await glob('merchants_*.csv');
    const transformMerchant = merchant => ({
      id: merchant["identifier"],
      name: merchant["chain name"]
    });

    // Read all of them
    const merchantFileContents = await Promise.all(merchantFiles.map(readFile));

    // Concatenate all merchants
    return merchantFileContents
      .reduce((merchants, fileContent) => {
        const newMerchants = parseCsv(fileContent);

        return merchants.concat(newMerchants.map(transformMerchant))
      }, []))
  },

  find: (id) =>
    MerchantsService
      .all()
      .then(all => all.filter(merchant => merchant.id === id)[0])
};

app.post('/hook', (req, res) => {
  const filename = `merchants_${new Date().toISOString()}.csv`;

  writeFile(filename, res.body)
    .then(() => res.status(200).send())
});

app.get('/merchants', (req, res) => {
  MerchantsService.findAll().then(merchants => res.send(merchants));
});
```

Monitor the performance penalty of requests accessing the repository. Once invoking the transformation for each request becomes too costly in terms of performance, cache the derived data through [memoization](https://en.wikipedia.org/wiki/Memoization) or similar caching methods. Take extensive measures to prevent the cache from becoming stale or in an inconstent state, e.g. by requiring timestamps as an additional parameter for each memoized request in order to preserve determinism.

While this sounds very costly at first and the code looks a bit more complicated under the hood, this approach will make it easier to change the transformation (even retroactively) even if it's been widely used for a while. At the same time, you preserve the capability to easily extract more information from the *Single Source Of Truth* whenever you need it.

--

_**From the Toolbox** is a compilation of small practices, tools and life-hacks I collected over the years._
