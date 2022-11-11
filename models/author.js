const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLenght: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual('name').get(function () {
  let fullName = '';
  if (this.first_name && this.family_name) {
    fullName = `${this.family_name}, ${this.first_name}`;
  }
  if (!this.first_name || !this.family_name) {
    fullName = '';
  }
  return fullName;
});

AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual('life_span').get(function () {
  return `${
    this.date_of_birth
      ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(
          DateTime.DATE_MED
        )
      : ''
  } - ${this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : ''}`;
});

AuthorSchema.virtual('date_of_birth_iso').get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate();
});

AuthorSchema.virtual('date_of_death_iso').get(function () {
  return DateTime.fromJSDate(this.date_of_death).toISODate();
});

module.exports = mongoose.model('Author', AuthorSchema);
