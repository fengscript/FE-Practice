<template>
  <div>
    <select
      name="userSelect"
      v-model="userSelect"
      id="user-list"
      class="user-list"
    >
      <option
        disabled
        selected
        value=""
      >Please Select</option>
      <option
        v-for="user in userList"
        :key="user.id"
        :value=user.name
      >{{user.name}}</option>
    </select>

    <div class="user-list">You will go to <span class="user-selected">{{userSelect}}</span></div>
    <router-link
      :to=getId
      class="user-list"
    >Go</router-link>
    <div class="content-box">
      <router-view id="user-info-view"></router-view>
    </div>

    <ul>
      <li
        v-for="(v, i) in list"
        :key="i"
      >{{v.text}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    getId() {
      return `/users/${this.userSelect}`;
    }
  },
  mounted() {
    setTimeout(_ => {
      this.list = [{ text: 666 }, { text: 666 }, { text: 666 }];
    }, 1000);
    setTimeout(_ => {
      this.list.forEach((v, i) => {
        v.text = i;
      });
    }, 2000);
  },
  data() {
    return {
      list:[],
      userList: [
        { name: "Html", id: 0 },
        { name: "Css", id: 1 },
        { name: "Javascript", id: 2 },
        { name: "Vue", id: 3 }
      ],
      userSelect: "",
      userInfoLink: `./UserInfo/${this.userSelect}`
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log(`You are from ${from.name}`);
    next();
  },
  methods: {},
  component: {}
};
</script>
<style>
.user-list {
  padding: 4px 6px;
  margin: 10px auto;
}
.user-selected {
  color: #ff8066;
}
</style>