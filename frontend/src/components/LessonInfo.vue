<template>
  <div class="lessonInfo">
    <div class="containerInfo">
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
    </div>
  </div>
</template>
<style lang="scss">
.lessonInfo {
  position: fixed;
  right: 2rem;
  top: 8rem;
  width: 350px;
  height: max-content;
  border-radius: 15px;
  margin-bottom: 6px;
  background: var(--v-secondary-base);
  flex-wrap: wrap;
  opacity: 0.4;
  transition: opacity 800ms;
  &:hover {
    opacity: 1;
  }

  .containerInfo {
    padding: 15px;
    text-align: left;
    width: 100%;
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
}
</style>
