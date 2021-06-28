<template>
  <div class="comments">
    <div class="commenter">
      <div class="person">
        <img width="20px" height="20px" src="@/assets/icons/user.svg" alt="" />
        <p class="name">Captain Jack Sparrow</p>
      </div>
      <p>
        Lorem ipsum dolor sit amet! Lorem ipsum dolor sit amet.
      </p>
    </div>
    <div class="commenter">
      <div class="person">
        <img width="20px" height="20px" src="@/assets/icons/user.svg" alt="" />
        <p class="name">Bilbo Baggins</p>
      </div>
      <p>
        Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Veritatis, ex? Lorem, ipsum dolor sit amet consectetur adipisicing
        elit.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comments {
  text-align: left;
  p {
    text-align: justify;
    hyphens: auto;
  }
  .person {
    display: flex;
    flex: row;
    align-content: center;
    opacity: 0.6;
    margin: 1.2rem 0 0.5rem 0;
    img {
      border: solid black 1px;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
    .name {
      margin: 0;
    }
  }
}
</style>
