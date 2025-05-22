using DavxeShop.Models.dbModels;
using DavxeShop.Models.models;
using DavxeShop.Models.Request.User;
using DavxeShop.Models.Response;
using DavxeShop.Persistance.Interfaces;

namespace DavxeShop.Persistance
{
    public class DavxeShopDboHelper : IDavxeShopDboHelper
    {
        private readonly DavxeShopContext _context;

        public DavxeShopDboHelper(DavxeShopContext context)
        {
            _context = context;
        }
        public List<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public UserBasicDto GetUser(int userId)
        {
            var user = _context.Users.FirstOrDefault(x => x.UserId == userId);

            if (user == null) return null;

            return new UserBasicDto
            {
                UserId = user.UserId,
                DNI = user.DNI,
                Name = user.Name,
                Email = user.Email,
                BirthDate = user.BirthDate,
                City = user.City,
                RolId = user.RolId,
                ImageBase64 = user.ImageBase64
            };
        }

        public User? GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email.Equals(email));
        }

        public bool UserExists(string Name, string Email, string DNI)
        {
            return _context.Users.Any(x => x.Name == Name && x.Email == Email && x.DNI == DNI);
        }

        public bool SaveUser(User requestHashed)
        {
            try
            {
                _context.Users.Add(requestHashed);
                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool CorrectUser(LogInRequest request)
        {
            return _context.Users.Any(x => x.Email == request.Email && x.Password == request.Password);
        }

        public string GetUserPasswordByEmail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email.Equals(email))?.Password ?? "Usuario no encontrado";
        }

        public int? GetUserId(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email.Equals(email))?.UserId;
        }

        public bool StoreSession(Session session)
        {
            try
            {
                _context.Sessions.Add(session);
                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool LogOut(string token)
        {
            var user = _context.Sessions.FirstOrDefault(x => x.Token == token);
            if (user == null)
                return false;

            user.Ended = DateTime.Now;
            _context.SaveChanges();

            return true;
        }

        public string GetTokenById(int userId)
        {
            return _context.Sessions.First(x => x.UserId == userId).Token ?? string.Empty;
        }

        public bool SaveRecoveryCode(int userId, string code, string email)
        {
            try
            {
                _context.RecoverCodes.Add(new RecoverCode
                {
                    UserId = userId,
                    RecoveryCode = code,
                    Email = email,
                    CreatedCode = DateTime.Now
                });
                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool VerifyRecoveryCode(VerifyRecoverPasswordRequest request)
        {
            return _context.RecoverCodes.Any(x => x.Email == request.Email && x.RecoveryCode == request.RecoveryCode);
        }

        public bool ResetPassword(ResetPasswordRequest request)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(x => x.Email == request.Email);

                if (user == null) return false;

                user.Password = request.Password;

                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool ValidToken(string token)
        {
            try
            {
                return _context.Sessions.Any(s => s.Token == token && s.Ended == null);
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UserExistsById(int userId)
        {
            try
            {
                return _context.Users.Any(s => s.UserId == userId);
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool AddProduct(ProductoDTO producto)
        {
            try
            {
                var productoMap = new Productos
                {
                    Nombre = producto.Nombre,
                    Descripcion = producto.Descripcion,
                    Precio = producto.Precio,
                    FechaPublicacion = producto.FechaPublicacion,
                    UserId = producto.UserId,
                    CategoriaId = producto.Categoria,
                    ImagenUrl = producto.ImagenUrl,
                };
                _context.Productos.Add(productoMap);
                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public List<ProductoDTO> GetProductosByUserId(int userId)
        {
            try
            {
                return _context.Productos
                    .Where(p => p.UserId == userId)
                    .Select(p => new ProductoDTO
                    {
                        ProductoId = p.ProductoId,
                        Nombre = p.Nombre,
                        Descripcion = p.Descripcion,
                        Precio = p.Precio,
                        FechaPublicacion = p.FechaPublicacion,
                        Categoria = p.CategoriaId,
                        ImagenUrl = p.ImagenUrl,
                        UserId = p.UserId
                    })
                    .ToList();
            }
            catch (Exception)
            {
                return new List<ProductoDTO>();
            }
        }

        public List<ProductoDTO> GetRandomProductos()
        {
            try
            {
                return _context.Productos
                    .OrderBy(p => Guid.NewGuid())
                    .Take(12)
                    .Select(p => new ProductoDTO
                    {
                        ProductoId = p.ProductoId,
                        Nombre = p.Nombre,
                        Descripcion = p.Descripcion,
                        Precio = p.Precio,
                        FechaPublicacion = p.FechaPublicacion,
                        Categoria = p.CategoriaId,
                        ImagenUrl = p.ImagenUrl,
                        UserId = p.UserId
                    })
                    .ToList();
            }
            catch (Exception)
            {
                return new List<ProductoDTO>();
            }
        }

        public List<CategoriaDTO> GetAllCategorias()
        {
            return _context.Categorias.Select(p => new CategoriaDTO
            {
                CategoriaId = p.CategoriaId,
                Nombre = p.Nombre,
            }).ToList();
        }

        public List<UserProductsDTO> GetRandomProductosUsers()
        {
            var usuariosValidos = _context.Users
                .Where(u => u.Productos.Count >= 8)
                .ToList();

            if (usuariosValidos.Count < 2) return new List<UserProductsDTO>();

            var random = new Random();
            var usuariosSeleccionados = usuariosValidos
                .OrderBy(x => random.Next())
                .Take(2)
                .ToList();

            var resultado = new List<UserProductsDTO>();

            foreach (var user in usuariosSeleccionados)
            {
                var productos = _context.Productos
                    .Where(p => p.UserId == user.UserId)
                    .Select(p => new ProductoDTO
                    {
                        ProductoId = p.ProductoId,
                        Nombre = p.Nombre,
                        Descripcion = p.Descripcion,
                        Precio = p.Precio,
                        ImagenUrl = p.ImagenUrl,
                        FechaPublicacion = p.FechaPublicacion
                    })
                    .ToList();

                resultado.Add(new UserProductsDTO
                {
                    UserId = user.UserId,
                    Nombre = user.Name,
                    Foto = user.ImageBase64 ?? "",
                    Productos = productos
                });
            }

            return resultado;
        }
    }
}
