function Mutation(mutationObject) {
    this._mutationObject = mutationObject;
}

Mutation.prototype.get = function () {
    return this._mutationObject;
};
