function links(parent, args, context) {
  return context.parent.link
    .findUnique({
      where: { id: parent.id },
    })
    .links();
}

module.exports = {
  links,
};
