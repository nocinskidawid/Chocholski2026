using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.IO;
using System.Text.Json;

namespace GameCollection
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public List<Game> games = new List<Game>();
        private const string FilePath = "Games.json"; 
        public MainWindow()
        {
            InitializeComponent();
            gamesGrid.ItemsSource = null;
            gamesGrid.ItemsSource = games;
            LoadGames();
            
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {

            if (titleBox.Text == "" || genreBox.Text == "" || !int.TryParse(ratingBox.Text, out int rating))
            {
                MessageBox.Show("Podaj poprawne dane");
            }
            else {
                return;
            }
            Game game = new Game
            {
                Title = titleBox.Text,
                Genre = genreBox.Text,
                Rating = int.Parse(ratingBox.Text),
                Completed = false
            };
            games.Add(game);
            SaveGames();
            LoadGames();

            titleBox.Clear();
            genreBox.Clear();
            ratingBox.Clear();

        }
        private void RemoveGames()
        {
            Game selected = gamesGrid.SelectedItem as Game;
            if (selected == null) return;
            games.Remove(selected);
            SaveGames();
            LoadGames();

           
        }

        private void LoadGames()
        {
            string json = File.ReadAllText(FilePath);
            games = JsonSerializer.Deserialize<List<Game>>(json);

            gamesGrid.ItemsSource = null;
            gamesGrid.ItemsSource = games;
        }
        private void SaveGames()
        {
            string json = JsonSerializer.Serialize(games, new JsonSerializerOptions {WriteIndented = true });
            File.WriteAllText(FilePath, json);
           
        }

        private void ToogleCompleted()
        {
            Game selected = gamesGrid.SelectedItem as Game;

            if (selected == null) return;

            selected.Completed = !selected.Completed;

            SaveGames();
            LoadGames();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            RemoveGames();

        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            ToogleCompleted();
        }
    }
}