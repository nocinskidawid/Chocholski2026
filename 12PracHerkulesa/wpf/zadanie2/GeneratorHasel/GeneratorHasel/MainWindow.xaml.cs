using System;
using System.Text;
using System.Windows;
using System.Windows.Controls;

namespace GeneratorHasel
{
    public partial class MainWindow : Window
    {
        private string wygenerowaneHaslo = null;

        public MainWindow()
        {
            InitializeComponent();
        }

        /*****************************************************
         nazwa funkcji:        GenerujHaslo
         opis funkcji:         Generuje losowe hasło o podanej długości
                               z uwzględnieniem zaznaczonych opcji
                               (małe/wielkie litery, cyfry, znaki specjalne).
         parametry:            dlugosc - liczba znaków hasła (int)
         zwracany typ i opis:  string - wygenerowane hasło
         autor:                Dawid Nocinski
        *****************************************************/
        private string GenerujHaslo(int dlugosc)
        {
            string maleLitery = "abcdefghijklmnopqrstuvwxyz";
            string wielkieLitery = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string cyfry = "0123456789";
            string znakiSpecjalne = "!@#$%^&*()_+-=";

            StringBuilder dozwoloneZnaki = new StringBuilder(maleLitery);

            if (chkMaleWielkie.IsChecked == true)
            {
                dozwoloneZnaki.Append(wielkieLitery);
            }

            if (chkCyfry.IsChecked == true)
            {
                dozwoloneZnaki.Append(cyfry);
            }

            if (chkZnakiSpecjalne.IsChecked == true)
            {
                dozwoloneZnaki.Append(znakiSpecjalne);
            }

            Random rnd = new Random();
            StringBuilder haslo = new StringBuilder();

            for (int i = 0; i < dlugosc; i++)
            {
                int indeks = rnd.Next(dozwoloneZnaki.Length);
                haslo.Append(dozwoloneZnaki[indeks]);
            }

            return haslo.ToString();
        }

        private void btnGenerujHaslo_Click(object sender, RoutedEventArgs e)
        {
            if (!int.TryParse(txtIleZnakow.Text, out int dlugosc) || dlugosc < 4 || dlugosc > 30)
            {
                MessageBox.Show("Podaj liczbę znaków od 4 do 30", "Błąd", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            wygenerowaneHaslo = GenerujHaslo(dlugosc);
            MessageBox.Show(wygenerowaneHaslo, "Wygenerowane hasło", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        private void btnZatwierdz_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrEmpty(wygenerowaneHaslo))
            {
                MessageBox.Show("Najpierw wygeneruj hasło", "Uwaga", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            string imie = txtImie.Text.Trim();
            string nazwisko = txtNazwisko.Text.Trim();
            string stanowisko = (cmbStanowisko.SelectedItem as ComboBoxItem)?.Content.ToString() ?? "";

            string komunikat = $"Dane pracownika: {imie} {nazwisko} {stanowisko}\nHasło: {wygenerowaneHaslo}";
            MessageBox.Show(komunikat, "Dane pracownika", MessageBoxButton.OK, MessageBoxImage.Information);
        }
    }
}