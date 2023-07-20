class UserFilter {
    constructor({ id }) {
      this.id = id;
      this.selectedEntity = null;
      this.selectedAttributes = [];
      this.whereConditions = {};
      this.orderByField = null;
    }
  
    select(entity) {
      this.selectedEntity = entity;
      return this;
    }
  
    attributes(attributes) {
      this.selectedAttributes = attributes;
      return this;
    }
  
    where(conditions) {
      this.whereConditions = conditions;
      return this;
    }
  
    order(field) {
      this.orderByField = field;
      return this;
    }
  
    async findAll() {
      const data = await loadData();
      let filteredData = data[this.selectedEntity];
  
      if (this.whereConditions) {
        filteredData = _.filter(filteredData, this.whereConditions);
      }
  
      if (this.selectedAttributes.length > 0) {
        filteredData = _.map(filteredData, (item) => _.pick(item, this.selectedAttributes));
      }
  
      if (this.orderByField) {
        filteredData = _.sortBy(filteredData, this.orderByField);
      }
  
      return Promise.resolve(filteredData);
    }
  
    async findOne() {
      return this.findAll().then((data) => data[0]);
    }
  }
  
  async function loadData() {
    const response = await fetch('sampleData.json');
    const data = await response.json();
    return data;
  }
  
  var User = UserFilter;
  
  // ------------------------------------------
  // You shouldn't need to edit below this line
  
  var user = new User({
    id: 123
  });
  
  // Mimic what an ORM-like query engine would do by filtering the
  // "sampleData" based on the query and the expected result example.
  // Hint: lodash can be quite handy in dealing with this.
  user
    .select('apps')
    .attributes(['id', 'title'])
    .where({ published: true })
    .order(['title'])
    .findAll()
    .then(function (apps) {
      // The expected result is for the "apps" array is:
      // [ { id: 6, title: 'Et' }, { id: 1, title: 'Lorem' } ]
      console.log(apps);
    });
  
  user
    .select('organizations')
    .attributes(['name'])
    .where({ suspended: false })
    .findOne()
    .then(function (organization) {
      // The expected result is for the "organization" object is:
      // { id: 3, name: 'Fliplet' }
      console.log(organization);
    });
  
    