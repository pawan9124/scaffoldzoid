export const checkIsSellerAccess = (req, res, next) => {
  if (req.user && !req.user.isSeller) {
    res.status(401).send("You are not permitted to access this route");
  } else {
    next();
  }
};

export const checkIsBuyerAccess = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    res.status(401).send("You are not permitted to access this route");
  } else {
    next();
  }
};
