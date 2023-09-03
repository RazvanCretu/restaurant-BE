"use strict";
// import Stripe from "stripe";
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_TOKEN);

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension");

    extensionService.use(({ strapi }) => ({
      typeDefs: ``,
      resolvers: {
        Mutation: {
          createOrder: async (parent, args, ctx) => {
            // console.log(ctx.koaContext);
            const user = ctx.state.user;

            const { toEntityResponse } = strapi.service(
              "plugin::graphql.format"
            ).returnTypes;

            const data = await strapi.service("api::order.order").create({
              data: { ...args.data, user: user.id },
            });

            return toEntityResponse(data);
          },
        },
      },
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
