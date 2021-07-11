<template>
  <table>
    <tr>
      <th>{{ $l("find.filters.subject.h") }}</th>
      <td>Maths</td>
      <td></td>
    </tr>
    <tr>
      <th>{{ $l("find.filters.language.h") }}</th>
      <td>English</td>
      <td></td>
    </tr>
    <tr>
      <th>{{ $l("find.filters.price.h") }}</th>
      <td>{{ tutor.pph }} UC/{{ $l("tutor.hour") }}</td>
      <td>
        <v-tooltip content-class="priceTooltip" right>
          <template v-slot:activator="{ on, attrs }">
            <div id="priceQuestionMark" v-bind="attrs" v-on="on">
              ?
            </div>
          </template>
          <span>{{ $l("booking.tooltip") }} </span>
        </v-tooltip>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    tutor: Object,
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  margin: 3rem 0;
}

td,
th {
  padding-bottom: 10px;
  margin: 0;
  width: calc(100% / 3);
}

tr:last-child {
  td,
  th {
    padding: 0;
  }
}

th {
  color: var(--v-secondary-darken2);
  font-weight: normal;
  text-align: left;
}

td {
  text-align: center;
}

#priceQuestionMark {
  width: fit-content;

  color: var(--v-secondary-darken2);
  cursor: default;
  padding: 1rem;
  margin: -1rem -1rem -1rem auto;

  transition: color 300ms ease-in-out;
  &:hover {
    color: var(--v-secondary-darken3);
  }
}

.priceTooltip {
  margin-left: 2rem;
  margin-right: 2vw;
  min-width: 200px;
  max-width: 350px;
  color: var(--v-primary-base);
  background: var(--v-secondary-base);
  opacity: 0.4 !important;
  border-radius: 15px;
  @media (max-width: 950px) {
    opacity: 1 !important;
    background: var(--v-secondary-darken1);
  }
}
</style>
