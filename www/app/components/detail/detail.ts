import {Page, NavParams, NavController, ViewController} from 'ionic-angular';
import {PokemonService} from '../../services/pokemon-service';
import {Capitalize} from '../../pipes/capitalize'
import Pokemon from '../../models/Pokemon';
import MoveDetail from '../move/move';
import Loader from '../loader/loader';

@Page({
    templateUrl: 'app/components/detail/detail.html',
    providers: [PokemonService],
    directives: [Loader],
    pipes: [Capitalize]
})

export class PokemonDetail {

    // the pokemon we're displaying
    private pokemon: Pokemon;

    constructor(
        public pokemonService: PokemonService,
        public params: NavParams,
        public nav: NavController,
        public viewCtrl: ViewController
    ) { }

    onPageDidEnter(): void {
        this.pokemonService.getPokemon(this.params.get('pokemon')).then(response => {
            this.pokemon = response;
        });
    }

    goToEvolution(evolution): void {
        this.pokemonService.getPokemonByUrl(evolution.resource_uri).then(response => {
            this.nav.push(PokemonDetail, {
                pokemon: response
            });
        });
    }

    goToMove(move): void {
        this.nav.push(MoveDetail, {
            pokemon: this.pokemon,
            move: move
        });
    }

}
