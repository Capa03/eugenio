import { Component } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { Character } from './../../interface/character-interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchTerm: string = '';
  characters: Character[] = [];
  images: { [key: number]: string } = {};

  errorMessage: string | null = null;

  constructor(private homeService: HomeService) { }

  onSearch(): void {
    this.errorMessage = null;
    console.log('Search term:', this.searchTerm);
    this.homeService.getCharacter('pt', this.searchTerm).pipe(
      map((response: Character[]) => {
        console.log(response);
        this.characters = response.filter(character => character.schematic !== true);
        if (this.characters.length > 0) {
          this.loadImage(this.characters[0]._id);
        } else {
          this.errorMessage = 'No pictograms found.';
        }
      })
    ).subscribe();
  }

  loadImage(id: number) {
    this.homeService.getImage(id).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      this.images[id] = url;
    }, error => {
      console.error('Failed to load image:', error);
      this.images[id] = '';
    });
  }

  getImageUrl(id: number) {
    return this.images[id];
  }

  downloadImage(id: number) {
    const imageUrl = this.getImageUrl(id);
    if (imageUrl) {
      // Cria um link temporário para fazer o download da imagem
      const link = document.createElement('a');
      link.href = imageUrl; // URL da imagem
      link.download = `pictogram_${id}.png`; // Nome do arquivo para download
      document.body.appendChild(link);
      link.click(); // Simula o clique no link
      document.body.removeChild(link); // Remove o link após o download
    } else {
      console.error('Image URL not found for ID:', id);
    }
  }

}
