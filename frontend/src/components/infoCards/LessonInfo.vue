<template>
  <InfoCardBase>
    <table>
      <tr>
        <th>{{ $l("find.filters.subject.h") }}</th>
        <td>Maths</td>
      </tr>
      <tr>
        <th>{{ $l("find.filters.language.h") }}</th>
        <td>English, Esonian</td>
      </tr>
      <tr>
        <th>{{ $l("find.filters.price.h") }}</th>
        <td>3.00 - 6.00 $/h</td>
      </tr>
      <tr>
        <th>{{ $l("find.filters.tutor_age.h") }}</th>
        <td>16 - 18 y.o.</td>
      </tr>
    </table>
  </InfoCardBase>
</template>

<script>
import InfoCardBase from "@/components/infoCards/InfoCardBase.vue";

export default {
  components: {
    InfoCardBase,
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  &.baseCard {
    position: fixed;
    right: 2rem;
    top: 8rem;
  }
}

table {
  width: 100%;
}
td,
th {
  padding-bottom: 10px;
  margin: 0;
}

tr:last-child {
  td,
  th {
    padding: 0;
    width: 50%;
  }
}

th {
  color: var(--v-secondary-darken2);
  font-weight: normal;
}

td {
  text-align: right;
}
</style>
