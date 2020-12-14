<template>
  <div class="footer">
    <wrapper class="small">
      <template v-if="type == 1">
        <!-- <p>
          <span></span>
          <br />
          <span></span>
        </p> -->
      </template>
    </wrapper>
  </div>
</template>

<script>
export default {
  name: 'XFooter',
  props: {
    type: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="less">
.footer {
  width: 100%;
  .wrapper {
    line-height: 30px;
    text-align: center;
    color: #b0b0b0;
    margin-top: 40px;
    padding: 20px 0;
    .dark {
      background-color: #272727;
    }
    .link {
      height: 56px;
      line-height: 56px;
      a {
        color: #b0b0b0;
      }
      .dot {
        padding: 0 40px;
      }
    }
    .address {
      height: 20px;
      line-height: 20px;
    }
    .copyright {
      height: 34px;
      line-height: 34px;
    }
  }
}
</style>
